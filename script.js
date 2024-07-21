//Variables & Const
const accesKey = "Jsh5d77wdlE0S_qIiWqM2C7xAFZiKo6eS2nMSFP4Zxg";
let url ="";

const form = document.querySelector('form');
const input = document.querySelector('.form__input');
const imgContainer = document.querySelector('.result');
const showMoreBtn = document.querySelector('.btn');
const intro = document.querySelector('.introduction');


let inputData = "";
let page = 0;

//EVENT 
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        //initialisation page apres une nouvelle recherche
        page = 0;
        inputData = input.value;
        search();
        input.value ='';
        intro.style.display ='none';
    })

//FUNCTIONS search
    async function search(){
        page++;
        
         url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`;

         const request = await fetch(url,{
            method : 'GET'
        })
        try {
            //error
            if(!request.ok){
                if(request.status === 404){
                    alert('Research not found')
                }else{
                    alert('Error while fetching Data')
                }
            }
            //no error
            else{
                const data = await request.json();
                const results = data.results;

                // Clear previous results if it's the first page
                if (page === 1) {
                    imgContainer.innerHTML = '';
                }


                results.forEach(result => {
                 
                    //asign data to var
                    const imgSource = result.urls.small;
                    const aUrl = result.links.html;
                    const description = result.alt_description

                    //impliment to html
                    const imgEl = document.createElement('div');
                    imgEl.classList.add('result__image');
                    imgEl.innerHTML = `
                    <a href="${aUrl}" target="_blank">
                    <img src="${imgSource}" alt="">
                    <p class="result__image-link">${description}</p>
                    </a>`;

                    imgContainer.appendChild(imgEl);

                });

                
             // Show more button visibility
            showMoreBtn.style.display = results.length > 0 ? 'block' : 'none';
        } }catch (error) {
            if(error.status === 404){
                console.log('Donnée non trouvée');
            }else  console.log('Erreur innatendue');
        }
    }

//EVENT : SHOW MORE BTN 
  
    showMoreBtn.addEventListener('click',()=>{
        search();
    })


