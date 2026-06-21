export default function GlassCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`glass-card p-5 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
{/*das */}