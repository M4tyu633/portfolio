/** A native-scroll interval long enough for one room to leave before the next enters. */
export default function WorldPassage({
  n,
  title,
}: {
  n: string;
  title: string;
}) {
  return (
    <div className="world-passage" data-world="index" data-world-panel>
      <p>
        <span>{n} / Next in the work</span>
        <strong>{title}</strong>
        <span aria-hidden="true">↓</span>
      </p>
    </div>
  );
}
