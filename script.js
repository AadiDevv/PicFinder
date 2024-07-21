//Variables & Const
const accesKey = "Jsh5d77wdlE0S_qIiWqM2C7xAFZiKo6eS2nMSFP4Zxg";
let url ="";

const form = document.querySelector('form');
const input = document.querySelector('.form__input');
const imgContainer = document.querySelector('.result__container');
const showMoreBtn = document.querySelector('.btn');
const intro = document.querySelector('.introduction');
const noResult = document.querySelector('.result__no');


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
                    noResult.style.display='none';

                }
                if(results.length === 0){
                    noResult.style.display='flex';
                    noResult.innerHTML = `
                    <h3>Sorry!</h3>
                    <p> No resultsfound for "${inputData}"...
                    `;
                }
                // number of generated images
                const numberOfImg = 8;

                for(let i=0; i<numberOfImg;i++){
                    //asign data to var
                    const imgSource = results[i].urls.small;
                    const aUrl = results[i].links.html;
                    const description = results[i].alt_description

                    //impliment to html
                    const imgEl = document.createElement('div');
                    imgEl.classList.add('result__image');
                    imgEl.innerHTML = `
                    <a href="${aUrl}" target="_blank">
                    <img src="${imgSource}" alt="">
                    <p class="result__image-link">${description}</p>
                    </a>`;

                    imgContainer.appendChild(imgEl);
                }
               
                
             // Show more button display
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


