const Course = ({course}) =>{

    const Header = ({ course }) => <h1>{course}</h1>

    const Content = ({ parts }) =>{ 

        const Part = ({ part }) =>{ 
            return(
            <p>
            {part.name} {part.exercises}
            </p>)
        }

        return(<>
        {parts.map(variable => <Part part={variable} />)}   
        </>)
    }

    const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>
    
    return(
    <>
        <Header course= {course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.map(variable => variable.exercises).reduce((sum, a) => sum + a, 0)} />
    </>)
}

export default Course