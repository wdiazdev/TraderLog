type Props = {
  title: string
  onClick?: () => void
}

export default function AppButton({ title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-[rgb(227,111,68)] rounded p-3 text-[20px]
        hover:bg-accent-2 transition-colors duration-200 ease-in-out"
    >
      {title}
    </button>
  )
}
