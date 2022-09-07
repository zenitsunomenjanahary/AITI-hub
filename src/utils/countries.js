import { countries } from "countries-list";

const countryList = ()=>{
    let countriesTab = [];
    Object.entries(countries).forEach((country)=>{
        countriesTab.push(country[1])
    })
    return countriesTab
}

export default countryList