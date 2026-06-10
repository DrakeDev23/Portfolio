export default function SectionHeader({ eyebrow, title }) {
  return (
    <div className="text-center mb-14">
      <p className="section-eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <div
        className="w-14 h-0.5 mx-auto mt-4 rounded-full"
        style={{ background: 'linear-gradient(90deg, #7A33FF, #c084fc)' }}
      />
    </div>
  )
}
