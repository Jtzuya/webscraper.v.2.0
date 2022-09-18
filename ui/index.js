// Constant variable where we insert our dynamic data
const __case = document.querySelector('.__case')

function submitChannel() {
    const channelValue = document.querySelector('.channel-input').value
    // Send the value to server

    fetch('http://localhost:3000/creators', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({channelValue})
    })
}

// Functiom that creates a new element for each generated dyncamic data
function newEl(type, attrs={}) {
    const el = document.createElement(type)
    
    for(let attr in attrs) {
        const val = attrs[attr]
        if (attr === 'innerText') el.innerText = val;
        else el.setAttribute(attr, val)
    }
    return el
}

// Constant variable for all of the data (static at the moment)
// const creators = [
//     {
//         name: 'Code Drip',
//         img: 'https://'
//     },
//     {
//         name: 'Dave Lee',
//         img: 'https://'
//     }
// ]

/* 
----------------------------------------------------------------------------
    Change constant variables for each generated to async function that will 
    fetch data to our API
----------------------------------------------------------------------------
*/
async function loadCreators() {
    const res = await fetch('http://localhost:3000/creators')
    const creators = await res.json()
    
    // Loop through all of the creators
    creators.forEach(creator => {
        const card = newEl('div', { class: 'card' })
        const title = newEl('div', { innerText: creator.name })
        const img = newEl('img', { src: creator.img })
    
        // Append the card to the root element
        __case.appendChild(card)
    
        // Insert the title & image inside our card
        card.appendChild(title)
        card.appendChild(img)
    })
}
loadCreators()