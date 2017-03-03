//
//  DetailViewController.swift
//  iOSTestTask
//
//  Created by Praveen on 04/03/17.
//  Copyright © 2017 Praveen. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    var userDetails = [String: Any]()
    
    @IBOutlet weak var imgUser: UIImageView!
    @IBOutlet weak var lblGender: UILabel!
    @IBOutlet weak var lblDOB: UILabel!
    @IBOutlet weak var lblPhoneNo: UILabel!
    @IBOutlet weak var lblEmail: UILabel!
    @IBOutlet weak var lblName: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        setupLoginUserDetails ()
        // Do any additional setup after loading the view.
    }

    func setupLoginUserDetails () {
        imgUser.layer.cornerRadius = imgUser.frame.size.width/2
        imgUser.clipsToBounds = true
        
         self.imgUser.image = self.userDetails["profilepic"] as! UIImage?
        self.lblName.text = String(format:"Name: %@", (self.userDetails["username"] as! String?)!)
        self.lblEmail.text =  String(format:"Email: %@",(self.userDetails["email"] as! String?)!)
        self.lblPhoneNo.text = String(format:"PhoneNumber: %@",(self.userDetails["phonenumber"] as! String?)!)
        self.lblDOB.text = String(format:"DateOfBirth: %@",(self.userDetails["dateofbirth"] as! String?)!)
        self.lblGender.text = String(format:"Gender: %@",(self.userDetails["gender"] as! String?)!)
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
