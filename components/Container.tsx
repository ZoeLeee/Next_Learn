export const Container = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
      div{
        max-width:1280px;
        margin:0 auto;
      }
    `}</style>
    </div>
  )
}