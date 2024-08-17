const jokeButton = document.getElementById("joke-button");
const jokeText = document.getElementById("joke-text");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeText(text) {
    jokeText.innerText = ''; // Clear the existing text
    for (let i = 0; i < text.length; i++) {
        jokeText.textContent += text[i];
        await sleep(70); // Wait for 100ms before adding the next letter
    }
}

writeText("Want to read a joke? Click the button");

async function getJoke(){
    const apiURI = "https://api.api-ninjas.com/v1/jokes"
    const apiKey = "pXSwouzzFTIogDWoTvIs3w==sxWj5Xy0s19gReMd"
    const options = {
        method: 'GET',
        headers: {
            "X-Api-Key": apiKey,
        },
    }
    
    try {
        jokeButton.disabled = true;
        jokeButton.innerText = "LOADING..."
        await writeText("READY FOR THE JOKE...")
        const response = await fetch(apiURI, options);
        const data = await response.json();
        console.log(data[0].joke)
        await writeText(data[0].joke)
        jokeButton.disabled = false;
        jokeButton.innerText = "Another one?"
        
        
    } catch (error) {
        console.log(error)
        jokeButton.disabled = false;
        jokeButton.innerText = "TRY AGAIN";
        await writeText("There is an error occurred, please try again")
    }
}
jokeButton.addEventListener('click', getJoke)