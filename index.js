const Bluebird = require('bluebird')

// TODO: This needs to be in the entry point (server.js, workerInit.js)
Promise.config({
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true
})

// TODO: This is for dm-worker (which is not being compiled through babel)
Bluebird.config({
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true
})

async function dummyTask () {
  console.log('Start executing task')
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Step 1 - done')
  await new Promise(cb => setTimeout(cb, 2000))
  console.log('Step 2 - done')
  await new Promise(cb => setTimeout(cb, 2000))
  console.log('Step 3 - done')
}

// A usecase of async/await nesting
async function runTask (taskFn = dummyTask) {
  await taskFn()
  console.log('Task executed!')
}

// A native promise usecase for the dm-worker runner to be cancellable
function runTaskNative (taskFn = dummyTask) {
  return Bluebird.resolve()
  .then(() => taskFn())
  .then(() => console.log('Task executed!'))
}

let taskRunner = runTaskNative()
setTimeout(() => { console.log('Cancel Task (taskRunner)'); taskRunner.cancel() }, 1500)
