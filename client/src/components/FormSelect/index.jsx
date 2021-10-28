import SelectSearch from 'react-select-search/dist/cjs/index.js';
import style from './index.module.scss';

export default function FormSelect(props){
    return(
        <SelectSearch {...props} ></SelectSearch>
    )
}