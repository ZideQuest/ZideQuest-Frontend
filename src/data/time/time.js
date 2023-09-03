

export function timeConv(time){
    const timestamp = time;
    const dateObj = new Date(timestamp);
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    console.log(formattedDate); 
    return formattedDate;
}