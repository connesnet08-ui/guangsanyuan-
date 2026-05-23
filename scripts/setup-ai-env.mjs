import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env.local");

const readSecret = async (prompt) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  if (!stdin.isTTY) {
    throw new Error("当前终端不支持安全输入，请在本机交互终端中运行。");
  }

  return await new Promise((resolve, reject) => {
    let value = "";

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", onData);
    };

    const onData = (buffer) => {
      const input = buffer.toString("utf8");

      if (input === "\u0003") {
        cleanup();
        stdout.write("\n已取消。\n");
        reject(new Error("已取消"));
        return;
      }

      if (input === "\r" || input === "\n") {
        cleanup();
        stdout.write("\n");
        resolve(value);
        return;
      }

      if (input === "\u007f" || input === "\b") {
        value = value.slice(0, -1);
        return;
      }

      value += input;
    };

    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.on("data", onData);
  });
};

try {
  const rawKey = await readSecret("请输入 DeepSeek API Key（输入时不会显示）：");
  const apiKey = rawKey.replace(/[\r\n]/g, "").trim();

  if (!apiKey) {
    console.error("配置失败：AI_API_KEY 不能为空。");
    process.exit(1);
  }

  if (!/^[\x21-\x7e]+$/.test(apiKey)) {
    console.error("配置失败：AI_API_KEY 只能包含英文、数字和常见符号，请重新复制完整 Key。");
    process.exit(1);
  }

  const envContent = [
    `AI_API_KEY=${apiKey}`,
    "AI_BASE_URL=https://api.deepseek.com",
    "AI_MODEL=deepseek-v4-flash",
    "",
  ].join("\n");

  await writeFile(envPath, envContent, { encoding: "utf8" });
  console.log("AI 环境变量已写入 .env.local");
} catch (error) {
  if (error instanceof Error && error.message !== "已取消") {
    console.error(`配置失败：${error.message}`);
  }

  process.exit(1);
}
