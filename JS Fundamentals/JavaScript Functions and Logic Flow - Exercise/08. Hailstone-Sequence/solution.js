function getNext() {
   function getSequence(n) {
       let seq = n + ' ';

       while(n !== 1){
           if(n % 2 === 0){
               n = (n / 2);
           }else{
               n = ((n * 3) + 1);
           }

           seq += (n + ' ');
       }

       return seq;
   }

   let num = document.getElementById('num');

   let sequence = getSequence(num.value);

   document.getElementById('result').textContent = sequence;

   num.value = '';
}

