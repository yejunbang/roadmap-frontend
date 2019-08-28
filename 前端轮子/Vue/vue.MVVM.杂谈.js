MVVM: Model-View-ViewModel

api(data,Model) ---> new Vue(ViewModel,Model) <---> virtual dom <---> dom(View)


面试杂谈：
MVVM就是Model-View-ViewModel，视图层和模型层通过ViewModel来相互通信，
api get回的数据可以看作是Model，Model更新了，ViewModel通过Observer观察者监听到数据的这种变化，
然后通知View做更新。当用户操作，更新视图View，ViewModel也能观察到变化，通知Model更新，这就是双向绑定了










