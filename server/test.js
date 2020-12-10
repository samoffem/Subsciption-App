const bcrypt = require('bcryptjs')
const saltRounds = 10;
const myPlaintextPassword = 'samuel';
const someOtherPlaintextPassword = 'offem';


let hash1=bcrypt.hashSync(myPlaintextPassword, saltRounds)

bcrypt.compare(myPlaintextPassword, hash1).then(function(result) {
    console.log('1',result)
}).catch(err=>console.log(err));
bcrypt.compare(someOtherPlaintextPassword, hash1).then(function(result) {
    console.log('2',result)
}).catch(err=>console.log(err))