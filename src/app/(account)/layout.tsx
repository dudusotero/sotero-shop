export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Account Layout</h1>
      <hr />
      {children}
    </div>
  )
}
