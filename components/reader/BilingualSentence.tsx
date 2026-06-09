export function BilingualSentence({ src, tgt }: { src: string; tgt: string }) {
  return (
    <span className="rdr-sent" data-sent>
      <span className="rdr-sent__src" data-sent-src>
        {src}
      </span>
      <span className="rdr-sent__tgt">{tgt}</span>{" "}
    </span>
  );
}
