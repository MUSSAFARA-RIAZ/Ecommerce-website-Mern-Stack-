class APIfeature{
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
        // console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        // pass by reference if we directly assign query str to it 
        // thats why we used spread operator 
        const copyquerystr={...this.queryStr}
        const removedfields=["keyword","page","limit"]
        removedfields.forEach(key=>delete copyquerystr[key])
        console.log(removedfields)
        this.query=this.query.find(copyquerystr)
        return this 




    }
   


}
module.exports = APIfeature;
