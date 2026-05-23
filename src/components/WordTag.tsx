type WordTagProps = {
  word: string;
};

const WordTag = ({ word }: WordTagProps) => (
  <span className="premium-chip word-chip-enter min-h-10 px-4 text-sm font-semibold text-stone-800">
    {word}
  </span>
);

export default WordTag;
