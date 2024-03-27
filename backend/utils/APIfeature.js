class APIFEATUREPROJECT{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
       
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                // regex is regular expression and here small i means case insensitive 

                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }: {}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }
   


}
module.exports =APIFEATUREPROJECT;
