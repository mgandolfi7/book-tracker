const deleteText = document.querySelector(".fa-trash");

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBook)
});

async function deleteBook() {
    const bTitle = this.parentNode.childNodes[1].innerText;
    const bAuthor = this.parentNode.childNodes[3].innerText;
    try {
        const res = await fetch("deleteBook", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "bookTitleS": bTitle,
                "bookAuthorS": bAuthor
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}
