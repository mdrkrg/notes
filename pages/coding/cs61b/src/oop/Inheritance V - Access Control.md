Inheritance V - Access Control
===
## Class Access Control
- **Private**: Only code from the given class can access
- **Package Private** (default): Classes that belong in the same package can access, but not subclasses
	- Prevent third-party extension modification
- **Protected**: Classes within the same package and subclasses can access these members
	- Subtypes might need it, but subtype clients will not
- **Public**: Open access to everyone
	- Promise of accessibility
	- Giving up a public: not removed but deprecated


| Modifier        | Class | Package | Subclass | World |
| --------------- | ----- | ------- | -------- | ----- |
| public          | Y     | Y       | Y        | Y     |
| protected       | Y     | Y       | Y        | N     |
| package private | Y     | Y       | N        | N     |
| private         | Y     | N       | N        | N     |
### Subtleties
#### Default Package
Cause:
- Everything unspecified belong to the default package
- Default: package private

Result:
- All members of default package are accessible between the default-package classes

#### Access is Based Only on Static Types
The access depends only on the static types.
#### Interfaces Defaults Public
For interfaces, the default access for its methods is actually public, and not package-private.