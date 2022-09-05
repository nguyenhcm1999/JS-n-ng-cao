
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
        return ++counter
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



// # Closure
// Là một hàm có thể ghi nhớ nơi nó được tạo và truy cập được biến ở bên ngoài phạm
// vi của nó

// ## Ứng dụng
// - Viết code ngắn gọn hơn
// - Biểu diễn, ứng dụng tính Private trong OOP

// ## Tóm tắt

// ## Lưu ý
// - Biến được tham chiếu (refer) trong closure sẽ không được xóa khỏi bộ nhớ
// khi hàm cha thực thi xong
// - Các khái niệm Javascript nâng cao rất dễ gây nhầm lẫn

function createLogger(namespace) {
    function logger(message){
        console.log(`[${namespace}] ${message}`)
    }
    return logger
}

// ============= App =================

// Register.js

const infoLogger = createLogger('Info')
infoLogger('Bắt đầu gửi mail')
infoLogger(' Gửi mail lỗi lần 1, thử gửi lại')

// ForgotPassword.js

const errorLogger = createLogger('Error')
errorLogger('Email không tồn tại trong DB')
errorLogger(' Gửi mail lỗi lần 1, thử gửi lại')



function creatStorage(key) {
    const store = JSON.parse(localStorage.getItem(key)) ?? {}

    const save = function(){
        localStorage.setItem(key, JSON.stringify(store))
    }

    const storage = {
        get(key) {
            return store[key]
        },
        set(key,value) {
// nó ghi nhớ phạm vi được tạo ra nên nó có quyền truy cập vào biến store ở phạm vi
// bên ngoài
            store[key] = value 
            save()
        },
        remove(key) {
            delete store[key]
            save()
        }

    }
    
    return storage
}

// Profile.js
const profileSetting = creatStorage('profile_setting')

console.log(profileSetting.get('fullName'))

profileSetting.set('fullName', 'Son Dang')
profileSetting.set('age', 20)
profileSetting.set('address', 'Ha Noi')

function fff(x) {
    x++;
    return function () {
        console.log(++x);
    };
}

fff(1)();

let x = fff(1);
x()
x()


let fullName1 = "Nguyen Van A"

{
    let fullName1 = "Nguyen Van B"
    {
        {
            // console.log(fullName1) Cannot access 'fullName1' before initialization

            let fullName1 = " Nguyen Van C"
        }
    }
}

var counter1 = makeCounter()

console.log(counter1(1))

function makeCounter() {
    let counter = 0
    return increase
    // hàm increase được hoist đưa lên đầu phạm vi của nó
    function increase(){
        return ++counter
    }
}

// var nhất định nghĩa biến lên trên đầu, var được hỗ trợ hoisting còn 
// let/ const khi được hoisted không được tạo giá trị và được đưa vào temporal dead zone
// r =10
// console.log(r) // sẽ báo lỗi vì lúc này r nằm trong temporal dead zone
// let r 

// Strict Mode - Nghiêm ngặt
// Báo lỗi hoặc ngăn chặn khi sử dụng những đoạn mã không an toàn hay dễ gây nhầm lẫn

// Cách sử dụng
// "use strict" thêm vào đầu file.js thì sẽ báo lỗi fullNametest và age2
// Thêm "use strict" vào ngay sau thẻ mở <script>
// Thêm "use strict" vào đầu phạm vi hàm
fullNametest = "Nguyen Van A"
function testFunc(){
    // "use strict" // Ví dụ thêm "use strict"
    age2 = 18
}
testFunc()
console.log(fullNametest)
console.log(age2)

// fetch('https://123jsonplaceholder.typicode.com/no-such-page')
// .then((res) => { 
//     console.log(res.status); // 404
//     return res.json();
// })
// .then(data => console.log('Success:', data))
// .catch(error => console.log('Error:', error));

function sum(...args) { // args is the name for the array
    let sum = 0;
    console.log((typeof args).length)
    args.forEach((arg) => sum += arg)
  
    return sum;
  }
  
  console.log( sum(1) ); // 1
  console.log( sum(1, 2) ); // 3
  console.log( sum(1, 2, 3) ); // 6