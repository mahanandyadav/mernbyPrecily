import './App.css';
import Comp from './component/component'
import Split from 'react-split'



function App() {
  console.log('by mahanand yadav')
  return (
    < >
      <Split
        style={{
          height: '99vh',
        }}
        direction='vertical'
        minSize={0}
        sizes={[0, 50, 50]}

      >
        <div></div>
        <Split
          sizes={[0, 40, 60, 0]}
          minSize={0}
          direction="horizontal"
          style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}
        >
          <div></div>
          <div id='divOne'>hello 1</div>
          <div id='divTwo'>hello 2</div>
          <div></div>
        </Split>

        <Split
          sizes={[90, 10]}
          minSize={100}
          direction="vertical"
          style={{ display: 'flex', flexDirection: 'column', }}
        >
          <div id='divThree'>divThree
            <Split
              sizes={[5, 90, 5]}
              minSize={0}
              direction='horizontal'
              style={{ display: 'flex',flexDirection:'row', height: '100%' }}
            >
              <div style={{ backgroundColor: 'grey' }}>div-grey1</div>
              <div  style={{ backgroundColor: 'lightblue' }}>
                <Comp/>
              </div>
              <div style={{ backgroundColor: 'grey' }}>div-grey2</div>
            </Split>

          </div>
          <div id='divFour'></div>
        </Split>
      </Split>
    </>
  )
}

export default App;