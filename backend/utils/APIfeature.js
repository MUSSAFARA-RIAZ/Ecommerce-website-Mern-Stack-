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
     
        let querystr=JSON.stringify(copyquerystr)
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
       
        this.query=this.query.find(JSON.parse(querystr))
        console.log(querystr)

        // copyquerystr=JSON.parse(querystr)
        // console.log(copyquerystr)


        // this.query=this.query.find(copyquerystr)
        return this 




    }
    pagination(resultperpage){
        const currentpage = Number(this.queryStr.page) || 1
     //   const resultperpage = Number(this.queryStr.limit) || 5
        const skip = (currentpage-1)*resultperpage
        this.query=this.query.limit(resultperpage).skip(skip)
        return this
    }
   


}
module.exports = APIfeature;
