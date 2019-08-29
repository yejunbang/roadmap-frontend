function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    defineDirective(obj, key, obj[key]);
  })

  function defineDirective(obj, key, value) {
    observe(value);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log('====get====>>>>', value);
        return value;
      },
      set: function (newValue) {
        observe(newValue);
        if (newValue !== value) {
          console.log('====set====>>>>', newValue);
          value = newValue
        }
      }
    });
  }
}

const person = {
  age: 10,
  name: 'pogba'
}
observe(person);
person.age = 20;
person.name = 'pogba1'
person.age;


// ==============================改成proxy=======================================
const person = {
  age: 10,
  name: 'pogba'
}
const d = new Proxy({
  age: 10,
  name: 'pogba'
}, {
  get(target, key, receiver) {
    console.log('====get===key=>>>>', key);
    console.log('====get===value=>>>>', target[key]);
  },
  set(target, key, value, receiver) {
    console.log('====set==key==>>>>', key);
    console.log('====set==newValue==>>>>', value);
  }
})
d.age
d.age = 20