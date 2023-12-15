const kontejner_listica = document.getElementById('kontejnerlistica');

for(let i = 0; i < 10; i++){
    const listic = document.createElement('div');
    listic.setAttribute('id', 'listic' + i);
    listic.className = 'listic';

    const indexlistica = document.createElement('div');
    indexlistica.className = 'indexListica';

    const brunetihbrojeva = document.createElement('div');
    brunetihbrojeva.className = 'brojUnetihBrojeva';
    brunetihbrojeva.setAttribute('id', 'brunetih' + i);

    const kontejnerDugmica = document.createElement('div')
    kontejnerDugmica.className = 'kontejnerDugmica';

    const dugmeX = document.createElement('button');
    dugmeX.className = 'dugmeX';
    dugmeX.setAttribute('onclick', 'obrisiKomb(' + i + ')');
    dugmeX.innerText = 'X';

    const dugmeQP = document.createElement('button');
    dugmeQP.className = 'dugmeQP';
    dugmeQP.setAttribute('onclick', 'randomKomb(' + i + ')');
    dugmeQP.innerText = 'QP';

    kontejnerDugmica.appendChild(dugmeX);
    kontejnerDugmica.appendChild(dugmeQP);

    const brojevi = document.createElement('div');
    brojevi.className = 'kontejnerBrojeva';

    indexlistica.innerText = i + 1;
    brunetihbrojeva.innerText = '0/7';
    for(let j = 0; j < 39; j++){
        const broj = document.createElement('button')
        broj.setAttribute('onclick', 'dodajoduzmiBroj(' + i + ', ' + j + ')');
        broj.setAttribute('id', 'broj' + i + j);
        broj.setAttribute('class','malapolja');
        broj.innerText = j + 1;

        brojevi.appendChild(broj);
    }

    listic.appendChild(indexlistica);
    listic.appendChild(brunetihbrojeva);
    listic.appendChild(kontejnerDugmica);
    listic.appendChild(brojevi);

    kontejner_listica.appendChild(listic);

}

let kombinacije = []; //matrica od 10 nizova za svaki listoc - cuva sppod o svakom oju
let brojunetihbrojeva = []; //niz od 10 clanova - duzina komibinacije

for(let i = 0; i < 10; i++){
    kombinacije[i] = [];
    brojunetihbrojeva[i] = 0;
    for(let j = 0; j < 39; j++)
        kombinacije[i][j] = false;
}

function dodajoduzmiBroj(index,broj){
    if(kombinacije[index][broj] == false && brojunetihbrojeva[index] < 7){
        kombinacije[index][broj] = true;
        brojunetihbrojeva[index] ++;
        document.getElementById('broj' + index + broj).classList.toggle('active');
    }
    else if(kombinacije[index][broj] == true && brojunetihbrojeva[index] > 0){
        kombinacije[index][broj] = false;
        brojunetihbrojeva[index] --;
        document.getElementById('broj' + index + broj).classList.toggle('active');
    }

    document.getElementById('brunetih' + index).innerText = brojunetihbrojeva[index] + '/7';

    // console.log(brojunetihbrojeva)
    // for(let i = 0; i < 10; i++)
    //     console.log(kombinacije[i])
    
}

function obrisiKomb(index){
    brojunetihbrojeva[index] = 0;
    for(let j = 0; j < 39; j++){
        if(kombinacije[index][j] == true)
            document.getElementById('broj' + index + j).classList.toggle('active');
        kombinacije[index][j] = false;
    }
        
    document.getElementById('brunetih' + index).innerText = brojunetihbrojeva[index] + '/7';
}

function randomKomb(index){
    obrisiKomb(index);

    let random = [];

    for(let i = 0; i < 7; i++){
        random[i] = Math.floor(Math.random() * 39);
        for(let j = 0; j < i; j++)
            if(random[j] == random[i]){
                i--;
                break;
            }
    }

    for(let i = 0; i < 7; i++)
        dodajoduzmiBroj(index,random[i]);
    
        
}

function igraj(){
    let poruka = '';

    let loto = [];

    for(let i = 0; i < 7; i++){
        loto[i] = Math.floor(Math.random() * 39);
        for(let j = 0; j < i; j++)
            if(loto[j] == loto[i]){
                i--;
                break;
            }
    }

    let brKomb = 0;
    for(let i = 0; i < 10; i++){
        if(brojunetihbrojeva[i] == 7){
            poruka += '\nKombinacija' + (brKomb++ + 1) + ': ';
            for(let j = 0; j < 39; j++){
                if(kombinacije[i][j]){
                    poruka += (j+1);
                    poruka += ', ';
                }
                    
            }
        }
            
    }

    poruka += 'Niste uneli ispravnu kombinaciju!\n';

    poruka += 'Loto kombinacija: '
    loto.sort();
    for(let i = 0; i < 7; i++)
        poruka += (loto[i] + 1) + ', ';

    poruka += '\nPogodci: ';
    for(let i = 0; i < 10; i++){
        
        if(brojunetihbrojeva[i] == 7){
            pogodak = 0;
            for(let j = 0; j < 7; j++)
                if(kombinacije[i][loto[j]] == true)
                    pogodak++;
            poruka += pogodak + ', ';
        }
        
    }
        
            
    window.alert(poruka);
}