import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import Employee from './models/Employee'
import Department from './models/Department'

export const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Get all departments
app.get('/api/departments', async (c) => {
  try {
    const departments = await Department.find();
    return c.json(departments);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
})

// Get all employees
app.get('/api/employees', async (c) => {
  try {
    const nameQuery = c.req.query('name');
    const filter = nameQuery ? { name: { $regex: nameQuery, $options: 'i' } } : {};
    
    const employees = await Employee.find(filter).populate('depId');
    return c.json(employees);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
})

// Create an employee
app.post('/api/employees', async (c) => {
  try {
    const body = await c.req.json();
    const employee = new Employee(body);
    const savedEmployee = await employee.save();
    const populatedEmployee = await savedEmployee.populate('depId');
    return c.json(populatedEmployee, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
})

// Update an employee
app.put('/api/employees/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedEmployee = await Employee.findByIdAndUpdate(id, body, { new: true }).populate('depId');
    if (!updatedEmployee) {
      return c.json({ error: 'Employee not found' }, 404);
    }
    return c.json(updatedEmployee);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
})

// Delete an employee
app.delete('/api/employees/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return c.json({ error: 'Employee not found' }, 404);
    }
    return c.json({ message: 'Employee deleted' });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
})

export const handler = handle(app)
