export const formatParagraph = (paragraphs) => {
    if (paragraphs.length === 1) {
        return <span key={paragraphs[0]}>{paragraphs[0]}</span>
    }

   const formattedParagraphs = paragraphs.map((p, idx) => {
       const lastParagraph = idx + 1 === paragraphs.length

        if (lastParagraph) {
            return <span key={p}>{p}</span>
        }

        return (
            <span key={p}>
                {p}
                <br />
                <br />
            </span>
        )
    })

    return formattedParagraphs
}