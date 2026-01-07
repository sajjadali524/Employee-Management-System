import mongoose  from "mongoose";
import Organization from "../models/organization.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

class organizationService {

    // create organization
    async create_organization (body) {
        try {
            const organization = await Organization.findOne({ code: body.code });
            if(organization) {
                throw new Error("Organization already exists");
            };

            const organizationAdmin = await User.findOne({ email: body.userEmail });
            if(organizationAdmin) {
                throw new Error("Same Admin already exists for different organization");
            };

            const newOrganization = await Organization.create({
                orgName: body.orgName,
                code: body.code,
                orgEmail: body.orgEmail,
                phone: body.phone,
                address: body.address,
                createdBy: body.createdBy
            });

            const hashedPassword = await bcrypt.hash(body.password, 10);

            const newOrganizationAdmin = await User.create({
                userName: body.userName,
                userEmail: body.userEmail,
                password: hashedPassword,
                role: body.role,
                organization: newOrganization._id
            });

            return {
                organization: newOrganization,
                organizationAdmin: newOrganizationAdmin
            };

        } catch (error) {
           throw new Error(error.message); 
        }
    };

    // get all organizations
    async get_all_organizations () {
        try {
            const organizations = await Organization.find();
            if(!organizations) {
                throw new Error("No organizations found");
            };

            return organizations;

        } catch (error) {
            throw new Error(error.message)
        }
    };

    // get organization by id
    async get_organization (org_id) {
        try {
            let query;
            if(mongoose.Types.ObjectId.isValid(org_id)) {
                query = {_id: org_id}
            } else {
                query = {code: org_id}
            }
            const organization = await Organization.findOne(query);
            if(!organization) {
                throw new Error("Organization not found");
            };

            return organization;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // update organization
    async update_organization (org_id, body) {
        try {
            let query;
            if(mongoose.Types.ObjectId.isValid(org_id)) {
                query = {_id: org_id}
            }else {
                query = {code: org_id}
            };

            const organization = await Organization.findOne(query);
            if(!organization) {
                throw new Error("Organization not found");
            };

            if(body.orgName) organization.orgName = body.orgName;
            if(body.code) organization.code = body.code;
            if(body.orgEmail) organization.orgEmail = body.orgEmail;
            if(body.phone) organization.phone = body.phone;
            if(body.address) organization.address = body.address;
            await organization.save();

            return organization;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // activate/deactivate organization
    async activate_deactivate_organization (org_id, status) {
        try {
            let query;
            if(mongoose.Types.ObjectId.isValid(org_id)) {
                query = { _id: org_id }
            }else {
                query = { code: org_id }
            }
            const organization = await Organization.findOne(query);

            if(!organization) {
                throw new Error("Organization not found");
            }

            organization.isActiveOrg = status;
            await organization.save();
            return organization;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // delete organization
    async delete_organization (org_id) {
        try {
            let query;
            if(mongoose.Types.ObjectId.isValid(org_id)) {
                query = { _id: org_id }
            }else {
                query = { code: org_id }
            }
            const organization = await Organization.findOneAndDelete(query);
            if(!organization) {
                throw new Error("Organization not found!")
            };

            return organization;
        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export default new organizationService();