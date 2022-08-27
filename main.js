// app được gán bằng IIFE vì bản chất của IIFE là 1 hàm chạy được ngay nên
// return cái gì trong hàm sẽ được gán = app

var app = (function(){
    // const cars được khai báo trong phạm vi của 1 hàm khác nên nó đã tạo ra
    // một phạm vi riêng biệt ở bên ngoài hàm. Không thể truy cập vào biến cars
    // Private
    var cars = []

    return {
        get(index) {
            return cars[index]
        },
        add(car) {
            cars.push(car)
        },
        edit(index,car) {
            cars[index] = car
        },
        delete(index) {
            cars.splice(index,1)
        }
    }
})() 


var number = (function(a,b){ 
    return a + b
    
})(1,2)

console.log(number)

// ;(function(a,b){console.log(a+b)})(1,2)


/* # Scope - Phạm vi
- Các loại phạm vi:
    - Global - toàn cầu
    - Code block - Khối mã: let, const { đây là code block },if else, loop,
    - Local scope - Hàm: var, function
- Khi gọi mỗi hàm luôn có 1 pham vi mới được tạo
- Các hàm có thể truy cập các biến được khai báo trong phạm vi của nó và 
  bên ngoài nó
- Cách thức một biến được truy cập
- Khi nào một biến bị xóa khỏi bộ nhớ?
    - Biến toàn cầu?
    - Biến trong code block & trong hàm?
    - Biến trong hàm được tham chiếu bởi 1 hàm? */

function logger() {
    var fullname = 'fullname'
    console.log(fullname) //biến fullname hoạt động trong phạm vi local scope
    function logger2() {
        console.log("LOG 2")
    }
    logger2()
}

logger() // Khi hàm logger được gọi thì phạm vi của hàm logger sẽ được tạo ra

// Lưu ý, cho dù là 1 hàm nhưng mỗi lần gọi hàm sẽ luôn tạo ra phạm vi mới

var a = '1'
console.log(typeof a)
console.log(JSON.parse(a))
console.log(typeof JSON.parse(a))
var c = [1,2,3]
console.log(typeof c)

function eee() {
    var e ='function a'
}
// console.log(e) sẽ báo lỗi vì từ bên ngoài không thể truy cập được vào biến e
// bên trong e

const age1 = 18
{const age1 = 12
    {   
        // const age1 =11
        console.log(age1)
        // const age1=12 //sẽ báo lỗi
    }
}

// age1 = 11 và không lỗi vì khai báo ở phạm vi khác nhau, còn cùng phạm vi sẽ lỗi

{
    var d = 'd' // nếu là let, const thì chỉ hoạt động ở trong code block thôi
}
console.log(d)

function makeCounter(){
    let counter = 0
    function increase(){
        return ++ counter
    }

    return increase
}

const increase1 = makeCounter()

console.log(increase1())
console.log(increase1())


class Car {
    constructor(make, colour) {
        this.make = make;
        this.colour = colour;
    }
    run() {
        console.log(this)
    }
}
const beemer = new Car('BMW', 'blue');
beemer.run()

Car.prototype.summarize = () => {
    console.log( `This car is a ${this.make} in the colour ${this.colour}`);  
};

beemer.summarize()

Car.prototype.summarize1 = function () {
    var test = () => {
        console.log( `This car is a ${this.make} in the colour ${this.colour}`)
    }
    test()
}

beemer.summarize1()

Car.prototype.summarize2 = function () {
    var test = function() {
        console.log( `This car is a ${this.make} in the colour ${this.colour}`)
    }
    test()
}

beemer.summarize2()
const person = {
    name:'hue',
    getName: function(){
        return this.name
     }
}

person.getName() // 'hue'

const getNamePerson = person.getName()
console.log(getNamePerson)


var user = { 
    a : this,
    firstName: "John",
    sayThis: function() {
        console.log(this)
      var sayHi = function() {
        console.log(`this is, ${this}!`); // this is, [Object Window]
        console.log('this is window?', this === window); // true
        console.log('Firstname is ', this.firstName); // undefined
      }
      // gọi hàm không có đối tượng đi kèm thì
      // context lúc này là window
      sayHi(); 
    }
  };

user.sayThis();


const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
  ];
  
console.log(materials.map(function(material){return material.length}));


let calc = {
    read:function(){
        this.a = +prompt('Nhập a', 0)
        this.b = +prompt('Nhập b', 0)
    },
    sum:function(){
       return this.a + this.b
    }
}
// calc.read()
console.log(calc.sum())

