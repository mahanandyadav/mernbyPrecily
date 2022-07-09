import './App.css';
import Comp from './component/component'
import Split from 'react-split'

// console.log(document.cookie)

function App() {
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
          <div id='divOne'>api response can be checked in console</div>
          <div id='divTwo'>hello 2</div>
          <div></div>
        </Split>

        <Split
          sizes={[100, 0]}
          minSize={100}
          direction="vertical"
          style={{ display: 'flex', flexDirection: 'column', }}
        >
          <div id='divThree'>
            <Split
              sizes={[0, 100, 0]}
              minSize={0}
              direction='horizontal'
              style={{ display: 'flex',flexDirection:'row', height: '100%' }}
            >
              <div ></div>
              <div  style={{ backgroundColor: '#FFB2A6' }}>
                <Comp/>
              </div>
              <div ></div>
            </Split>

          </div>
          <div id='divFour'></div>
        </Split>
      </Split>
    </>
  )
}

export default App;