// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function generator(questions, block, bAmount) {
    const length = questions.length;
    var pack = [];
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    while (pack.length < block*bAmount) {
        let date = new Date();
        let millisecs = date.getMilliseconds();
        let n = Math.floor(Math.random() * length);
        if (pack.includes(n)) continue;
        pack.push(n);
    }
    
    let res = '';
    for (i = 0; i < block*bAmount; i++) {
        res += (`${(i)%(block) ? '' : "<br><h2>Строго секретно. Форма 14/25-б<h2><h3>Досье</h3><br>"}${(i)%(block) + 1}) ${questions[pack[i]]}<br><br><hr><br><hr><br>${(i+1)%(block) ? '' : '<br>'}`)
    }
    return res;
}

var control = document.getElementById("list");
control.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы

        file = control.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            var contents = event.target.result;
            const textArr = contents.split('\n');
            
            let res;
            for (let i = 0; i < 35; i ++) {
                res += generator(textArr, 7, 2);
            };
            
            document.getElementById('output').innerHTML = res;
        };
        
        reader.onerror = function(event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
    
        reader.readAsText(file);
        
 
}, false);
