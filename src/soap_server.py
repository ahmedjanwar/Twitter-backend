from zeep import Server, xsd
from collections import namedtuple

# Data Structures
Address = namedtuple('Address', ['city', 'state'])
Person = namedtuple('Person', ['name', 'age', 'address'])  

# Sample Data (Replace with your actual data sources)
sample_people = {
    1: Person('Alice', 30, Address('New York', 'NY')),
    2: Person('Bob', 25, Address('Los Angeles', 'CA')),
}
zip_lookup = {
    '90210': Address('Beverly Hills', 'CA'),
    '10001': Address('New York', 'NY')
}

# Operations Implementation
def AddInteger(x, y):
    return x + y

def DivideInteger(x, y):
    if y == 0: 
        raise ValueError("Division by zero") 
    return x / y

def FindPerson(id):
    return sample_people.get(id)

# SOAP Server Setup 
server = Server(xsd.Schema(elementFormDefault='qualified', targetNamespace='http://mydomain.com/demo'), port=5000)
server.add_service('DemoService', 'http://mydomain.com/demo', 'DemoService.wsdl')
server.add_binding('SOAPBinding',  'http://schemas.xmlsoap.org/soap/http', 'http://mydomain.com/demo/soap')

# Add all your implemented methods here
server.add_method('AddInteger', xsd.Integer(), xsd.Integer(), AddInteger)
server.add_method('DivideInteger', xsd.Integer(), xsd.Float(), DivideInteger)  # Assuming Float return type 
server.add_method('FindPerson', xsd.Integer(), Person,  FindPerson)
# ... Add other methods (GetByName, GetDataSetByName etc.) with appropriate types

server.serve() 
