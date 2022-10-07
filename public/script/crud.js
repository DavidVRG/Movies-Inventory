/* VARIABLES */
const cards = document.querySelector('.cards')
const updateForm = document.querySelector('.updateForm')
const exit = document.querySelector('.exit')

/* HIDE UPDATEFORM */
exit.addEventListener('click', () => {
    updateForm.classList.remove('showFlex')
})

/* GET MOVIES */
function createCard(){
    fetch('/get')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('dataset', element._id)

            const image = document.createElement('div')
            image.setAttribute('class', 'image')

            const img = document.createElement('img')
            img.setAttribute('src', `img/${element.filename}`)

            const text = document.createElement('div')
            text.setAttribute('class', 'text')

            const title = document.createElement('div')
            title.setAttribute('class', 'title')
            title.innerHTML = element.movieName

            const desc = document.createElement('div')
            desc.setAttribute('class', 'desc')
            desc.innerHTML = element.desc

            const btnGroup = document.createElement('div')
            btnGroup.setAttribute('class', 'btn-group')

            const update = document.createElement('button')
            update.setAttribute('class', 'update')
            update.innerHTML = 'Update'

            const remove = document.createElement('button')
            remove.setAttribute('class', 'remove')
            remove.innerHTML = 'Remove'

            image.appendChild(img)

            text.appendChild(title)
            text.appendChild(desc)

            btnGroup.appendChild(update)
            btnGroup.appendChild(remove)

            card.appendChild(image)
            card.appendChild(text)
            card.appendChild(btnGroup)

            cards.append(card)
        });
        remove()
        update()
    })
}
createCard()

/* REMOVE MOVIES */
function remove() {
    const removeBtn = document.querySelectorAll('.remove')
    removeBtn.forEach(element => {
        element.addEventListener('click', async() => {
            const filename = element.parentNode.parentNode.querySelector('.image').firstElementChild.src
            const filenameReplace = filename.replace(/^.*[\\\/]/, '');
            const id = await element.parentNode.parentNode.getAttribute('dataset')
            await fetch('/remove', {
                    method: 'delete',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: id, filename: filenameReplace})
            })
            .then(res => {
                if(res.ok){
                    window.location.replace('/');
                }else{
                    alert('Remove error!')
                }
            })
        })
    })
}

/* UPDATE MOVIES */
function update(){
    const updateBtn = document.querySelectorAll('.update')

    updateBtn.forEach(element => {
        element.addEventListener('click', async () => {
            const id = await element.parentNode.parentNode.getAttribute('dataset')
        
            updateForm.classList.add('showFlex')

            updateForm.addEventListener('submit', (event) => {
                event.preventDefault()

                const newMovieName = event.target.querySelector('.movieName').value
                const newDesc = event.target.querySelector('.desc').value
                
                fetch('/update', {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id:id,
                        movieName: newMovieName,
                        desc: newDesc
                    })
                })
                .then(res => {
                    if(res.ok){
                        window.location.replace('/');
                    }else{
                        alert('Update error!')
                    }
                })
            })
        })
    })
}