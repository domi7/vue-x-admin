import Vue from 'vue'
import {
    Button,
    Input,
    Message,
    Notification,
    Dialog,
    Popover,
    RadioGroup,
    RadioButton
}
    from 'element-ui'

Message.install = function (Vue) {
    Vue.prototype.$message = Message
    Vue.$message = Message;

}

Notification.install=function (Vue) {
    Vue.prototype.$notify = Notification
}
const components = [
    Button,
    Input,
    Message,
    Notification,
    Dialog,
    Popover,
    RadioGroup,
    RadioButton
];

components.forEach(item => Vue.use(item));
