const async = require('./helpers/async.js')
const expectThrow = require('./helpers/expectThrow').handle
const bigNumber = require('bignumber.js')
const test = async.test
const setup = async.setup
const time = require('./helpers/time')
const lock = artifacts.require('Lock')
const mockToken = artifacts.require('MockToken')
contract ('lock',accounts=>{
    var lockInstance

    setup(async ()=>{
        lockInstance = await lock.deployed()
    })

    test('Attempting to initialize while initialized fails', async ()=>{

    })

    test ('initializing and depositing releases regular payments until zero', async ()=>{

    })

    test('initializing after zero resets schedule',async ()=>{
        
    })

    test('depositing inceases next payment but leaves duration unchanged', async ()=>{
        
    })
})