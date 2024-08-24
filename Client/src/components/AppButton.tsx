type Props = {
  title: string
  onClick?: () => void
  type?: "button" | "submit" | "reset" | undefined
}

export default function AppButton({ title, onClick, type = "button" }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="mt-4 bg-[rgb(227,111,68)] rounded p-3 text-[20px]
        hover:bg-accent-2 transition-colors duration-200 ease-in-out"
    >
      {title}
    </button>
  )
}
