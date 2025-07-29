type Props = {
  timestamp: string
}

export default function DateFormatter({ timestamp }: Props) {
  const date = new Date(timestamp)
  var jstDate = date.toLocaleString("fr-FR", { timeZone: "Europe/Paris" })

  return (
    <>
      {jstDate}
    </>
  )
}