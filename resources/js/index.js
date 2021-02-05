class Menu{
    constructor(img, altimg, title, descr, price, parentSelector, ...classes){
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parentSelector = document.querySelector(parentSelector);
        this.transfer = 3;
        this.changeToBY();
    }

    changeToBY(){
        this.price  = +this.price * this.transfer;
    }

    render(){
        const element = document.createElement('div');
        
        if(this.classes.length === 0){
            this.element = 'menu__item';
            element.classList.add(this.element);
        }else{
            this.classes.forEach(className => element.classList.add(className));
        }


        element.innerHTML = `         
        <img src = ${this.img} alt=${this.altimg}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> BY/день</div>
        </div>
        `;
        this.parentSelector.append(element);
    }
};

const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok){
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

getResource('http://localhost:3000/menu')
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => 
    {
        new Menu(img, altimg, title, descr, price, '.menu .container').render();
    });
});