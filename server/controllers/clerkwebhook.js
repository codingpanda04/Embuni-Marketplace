import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        await whook.verify(JSON.stringify(req.body), headers);

        const {data, type} = req.body;
        
        const userData = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address || '',
            username: data.first_name + " " + data.last_name || '',
            image: data.image_url || '',
            role: data.public_metadata?.role || 'buyer',
            following: []
        }


        switch (type) {
            case "user.created": {
                await User.create(userData);
                res.status(200).json({message: "User created successfully"});
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                res.status(200).json({message: "User updated successfully"});
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(userData._id);
                res.status(200).json({message: "User deleted successfully"});
                break;
            }
        
            default:
                break;
        }

        res.status(200).json({message: "Webhook processed successfully"});
    } catch (error) {
        res.status(400).json({error: "Webhook verification failed", message: error.message});
    }
}

export default clerkWebhook;
