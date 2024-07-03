const numberDash  = (str) => {    

    function is_numeric(str){
        return /^\d+$/.test(str);
    }

    str = str.split("")
    str = str.filter((item) => is_numeric(item))
    str = str.slice(0, 6)
    str = str.join("")
    if(str.length > 0) {
        str = str.match(new RegExp('.{1,2}', 'g')).join("-")
    }
    return str
};

 module.exports = numberDash
