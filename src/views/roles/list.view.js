import React from 'react';
import { Breadcrumb, Card, Table } from '@themesberg/react-bootstrap';

export default function RoleList() {
    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item>Med-O-Sys</Breadcrumb.Item>
                        <Breadcrumb.Item active>roles</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>List of roles</h4>
                </div>
            </div>

            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                    <Table responsive className="table-centered table-nowrap rounded mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">Id</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Slug</th>
                                <th className="border-0">Date Created</th>
                                <th className="border-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}
