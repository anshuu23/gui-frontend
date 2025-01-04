function btnClicked(){
    qry = document.querySelector('#querry').value;
    const box = document.querySelector('body');
    const prevQuerry=document.querySelector('.prevQuerry')
    makePageNonClickable()
    prevQuerry.innerHTML += `->${qry} <br>`;
    prevQuerry.scrollTop = prevQuerry.scrollHeight;
   

    fetch('https://learnsql-5vx7.onrender.com/sql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ querry: qry}), // Data to send in JSON format
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(dataa => {
            
            console.log(dataa);
            const data = dataa.db
            const footer = document.querySelector('footer')
            const displayAiData = document.querySelector('.aiData')
            if(Array.isArray(data)){
            // Create a table element
            let table = document.createElement('table');

            // Create the table headers based on the keys of the first object
            let headers = Object.keys(data[0]);
            let headerRow = document.createElement('tr');

            headers.forEach(header => {
                let th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            // Loop through the data array and create rows for each object
            data.forEach(item => {
                let row = document.createElement('tr');

                headers.forEach(header => {
                    let cell = document.createElement('td');
                    cell.textContent = item[header];
                    row.appendChild(cell);
                });

                table.appendChild(row);
            });

            // Append the table to the body or any specific div
            
            footer.appendChild(table);
            
                console.log('data send is arr')
                footer.style.color='white';
            }
            else{
                console.log('data send is not arr')
                footer.innerHTML+=`<p id='error'> ${data} <p><br><hr><br>`;
               
            }
            footer.scrollTop = footer.scrollHeight;
            
            displayAiData.innerHTML=`<p id="mainP"> Ai Review -></p><pre> ${(dataa.ai.toString())}</pre>`
            makePageClickable()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            makePageClickable()
        });

}

window.addEventListener('keypress',(event)=>{
    if(event.key == "Enter"){
        btnClicked()
    }
})

function makePageNonClickable() {
    // Create a full-page div overlay
    let overlay = document.createElement('div');
    
    // Set the style to cover the entire page and prevent clicks
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)'; // Transparent
    overlay.style.zIndex = '9999'; // Make sure it's on top of everything
    overlay.style.cursor = 'not-allowed'; // Change cursor to show it's disabled
    
    // Append the overlay to the body
    document.body.appendChild(overlay);
}

function makePageClickable() {
    // Remove the overlay, making the page clickable again
    let overlay = document.querySelector('div[style*="z-index: 9999"]');
    if (overlay) {
        document.body.removeChild(overlay);
       
    }
}
