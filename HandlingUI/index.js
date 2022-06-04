// Rate : Nice() Excellent(true) Awesome()

/**
 * 
 * Limits :
 * 
 * can be any exceptional cases - test cases, file upload or even in UI flow.
 * 
 * 1. test cases
 * 
 * 2. upload
 * 
 * 3. UI
 * 
 * 4. Text input
 * 
 * 5. What the maximum text file size?
 * 
 * Large case should be handled like example??? huge list
 * 
 * Limiting user data while updating collection...
 * 
 * Ex : File Upload
 * 
 * 1. File size, File type expected.
 * 
 * What happens if we don`t?? Brief
 * 1. Gone a crash if it takes more time for file upload.
 * 2. Instance will have minimal memory allocated, but passing huge file for processing will break.
 * 
 * Where we face these issues?? 
 * 1. We are asking user for uploading documents for processing.
 * 2. We know exact file type we will accept for processing.
 * 
 * How its helpful?? with Prevention steps
 * 1. Will avoid the issue from initial stage - can be file format or file size
 * 2. Know the limit of instance memory allocated for processing
 * 
 * When its helpful?? 
 * 1. While asking documents for processing from user - showing proper warning message.
 * 
 * 
 */
 class CustomersList {
    constructor(data) {
        this.data = data;
    }

    render() {

        const { data = {} } = this.state;

        const { customerInfo = [] } = data || {};

        return (
            <table>
                <caption>Customer</caption>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {customerInfo.map(item => (
                        <tr key={i}>

                            <td>{item.id}</td>

                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}



// Limiting User input
const message = req.body.content;

// What happens if the message is many megabytes of data? Do we want to store
// that in the database? We should set limits on the size.
db.save(message);


/**
 * 
 * When start - find the limit 
 * 
 * Then handle it...
 * 
 */












// ASE, ASM, SOM , RSM -- available in hierarchy

// Eliminating SOM & BDM in hierarchy

// Remove SOM & BDM - only from approval process should have access to view documents

// RSA , RC, RCLSM, MDM, SMS -- not present in hierarchy

// Regions - 


// Role hierarchy confirmation - how the flow will be forwarded like ASE -> ASM -> RSA

// Role privilege - 

// 










