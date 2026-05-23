type WordTagProps = {
  word: string;
};

const WordTag = ({ word }: WordTagProps) => (
  <span className="inline-flex items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-stone-800 shadow-sm ring-1 ring-amber-100">
    {word}
  </span>
);

export default WordTag;
