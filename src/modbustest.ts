import modbus from 'modbus'

const ipAddress = "192.168.0.167";
const port = 8000;
const unitId = 1;

const device = modbus(ipAddress, port, unitId);
export const modbusTest = async () => {
    let myHoldingRegisters = await device.read('hr0-10');
    console.log('[HOLDING REGISTER]', myHoldingRegisters);
}