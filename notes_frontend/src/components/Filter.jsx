import React from 'react'

function Filter() {
  return (
    <div className='container' style={{width:"500px", margin:"20px auto"}}>
        <select aria-label='Default select example' style={{height:"50px"}} className="form-select">
            <option defaultValue="filter">Filter Notes</option>
            <option value="1">Business</option>
            <option value="2">Personal</option>
            <option value="3">Important</option>
        </select>

    </div>
  )
}

export default Filter