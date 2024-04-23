import arab from './arabCountries'
import countries from './countries'

export default arab.concat(countries.filter(el => !arab.includes(el)))