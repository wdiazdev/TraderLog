type Props = {
  placeholder: string
  type?: string
  autoFocus?: boolean
}

export default function AppInputField({ placeholder, type = "text", autoFocus }: Props) {
  return (
    <input
      autoFocus={autoFocus}
      placeholder={placeholder}
      type={type}
      className="bg-[rgb(226,232,240)] border 
            border-gray-500 rounded p-4"
    />
  )
}
