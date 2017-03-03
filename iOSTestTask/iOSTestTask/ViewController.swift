//
//  ViewController.swift
//  iOSTestTask
//
//  Created by Praveen on 03/03/17.
//  Copyright © 2017 Praveen. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController , UINavigationControllerDelegate, UIImagePickerControllerDelegate, UITextFieldDelegate {

    //TextField
    @IBOutlet weak var tfUserName: UITextField!
    @IBOutlet weak var tfEmail: UITextField!
    @IBOutlet weak var tfPhonenumber: UITextField!
    @IBOutlet weak var tfDateOfBirth: UITextField!
    
    //Button
    @IBOutlet weak var btnProfilePicture: UIButton!
    @IBOutlet weak var btnMale: UIButton!
    @IBOutlet weak var btnFemale: UIButton!
    
    //Variable
    var stringGender = "Male"
    var loginUserDetails = [String: Any]()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func btnDateofBirthMethod(_ sender: Any) {
        self.view.endEditing(true)
        DatePickerDialog().show("DatePicker", doneButtonTitle: "Done", cancelButtonTitle: "Cancel", datePickerMode: .date) {
            (date) -> Void in
            if date != nil {
                let formatter = DateFormatter()
                formatter.dateFormat = "dd-MM-yyyy"
                let dateString = formatter.string(from: date!)
                self.tfDateOfBirth.text = "\(dateString)"
            }else {
                self.tfDateOfBirth.text = ""
            }
        }

    }

    @IBAction func btnSubmitMethod(_ sender: Any) {
         self.checkValidation()
    }
    
    @IBAction func btnAddProfileMethod(_ sender: Any) {
        self.showActionSheet()
    }
    
        
    @IBAction func btnSelectGenderMale(_ sender: Any) {
        self.btnMale.setImage(UIImage.init(named: "CheckedCheckbox"), for: .normal)
        self.btnFemale.setImage(UIImage.init(named: "UncheckedCheckbox"), for: .normal)
        self.stringGender = "Male"
    }
    @IBAction func btnSelectGenderFemale(_ sender: Any) {
        self.btnMale.setImage(UIImage.init(named: "UncheckedCheckbox"), for: .normal)
        self.btnFemale.setImage(UIImage.init(named: "CheckedCheckbox"), for: .normal)
        self.stringGender = "Female"
    }
     //Mark: - Local Methods
    
    func checkValidation() {
        
        if Utility.trimString(value: self.tfUserName.text!).characters.isEmpty{
            Utility.showAlertOnViewController(targetVC: self, title: "LoginView", message: KEnterUserName)
            return;
            
        }else if (!(Utility.validateEmail(email: self.tfEmail.text!) as Bool)) {
            Utility.showAlertOnViewController(targetVC: self, title: "LoginView", message: KValidEmail)
            return
        }
        self.gotoLoginDetailViewController()
        
    }
    
    func gotoLoginDetailViewController()  {
//        loginUserDetails = ["profilepic": btnProfilePicture.currentImage as Any, "username": self.textfieldUserName.text!, "email": self.textfieldEmail.text! , "phonenumber": self.textfieldPhonenumber.text!, "dateofbirth": self.textfiledDateOfBirth.text!, "gender": stringGender]
//        let loginDetails = self.storyboard?.instantiateViewController(withIdentifier: "LoginDetailController") as! LoginDetailController
//        loginDetails.loginUserDetails = loginUserDetails
//        self.navigationController?.pushViewController(loginDetails, animated: true)
    }
    
    
    // MARK: - Method for Camera and Gallery ActionSheet
    
    func showActionSheet() {
        
        let actionSheetController: UIAlertController = UIAlertController(title: nil, message: "Choose Photo From", preferredStyle: .actionSheet)
        
        let cancelActionButton: UIAlertAction = UIAlertAction(title: "Cancel", style: .cancel) { action -> Void in
            
        }
        actionSheetController.addAction(cancelActionButton)
        
        let cameraActionButton: UIAlertAction = UIAlertAction(title: "Camera", style: .default)
        { action -> Void in
            
            self.cameraAccessPermission(sourceType: .camera)
        }
        actionSheetController.addAction(cameraActionButton)
        
        let galleryActionButton: UIAlertAction = UIAlertAction(title: "Gallery", style: .default)
        { action -> Void in
            self.cameraAccessPermission(sourceType: .photoLibrary)
        }
        actionSheetController.addAction(galleryActionButton)
        self.present(actionSheetController, animated: true, completion: nil)
    }
    
    func cameraAccessPermission(sourceType:
        UIImagePickerControllerSourceType)
    {
        let status = AVCaptureDevice.authorizationStatus(forMediaType: AVMediaTypeVideo)
        if status == AVAuthorizationStatus.authorized
        {
            self.openResourceForImage(sourceType: sourceType)
        }
        else if status == AVAuthorizationStatus.notDetermined
        {
            AVCaptureDevice.requestAccess(forMediaType: AVMediaTypeVideo, completionHandler: { (granted) in
                if ( granted)
                {
                    self.openResourceForImage(sourceType: sourceType)
                }
            })
        }
            
        else if status == AVAuthorizationStatus.restricted
        {
            let alert = UIAlertController(title: "Message", message: KCameraAuthorization, preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "Close", style: UIAlertActionStyle.cancel, handler: { (ACTION :UIAlertAction!)in
                self.dismiss(animated: true, completion: nil)
                
            }))
            alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler:{ (ACTION :UIAlertAction!)in
                
                let settingsUrl = NSURL(string: UIApplicationOpenSettingsURLString)
                if let url = settingsUrl {
                    if #available(iOS 10.0, *) {
                        UIApplication.shared.open(url as URL, options: [:], completionHandler: nil)
                    } else {
                        // Fallback on earlier versions
                    }
                }
            }))
            self.present(alert, animated: true, completion: nil)
            
        }
        else if status == AVAuthorizationStatus.denied
        {
            let alert = UIAlertController(title: "Message", message: KCameraAuthorization, preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "Close", style: UIAlertActionStyle.cancel, handler: { (ACTION :UIAlertAction!)in
                self.dismiss(animated: true, completion: nil)
            }))
            alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler:{ (ACTION :UIAlertAction!)in
                
                let settingsUrl = NSURL(string: UIApplicationOpenSettingsURLString)
                if let url = settingsUrl {
                    if #available(iOS 10.0, *) {
                        UIApplication.shared.open(url as URL, options: [:], completionHandler: nil)
                    } else {
                        // Fallback on earlier versions
                    }
                }
            }))
            
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    func openResourceForImage(sourceType:UIImagePickerControllerSourceType) {
        
        self.view.endEditing(true)
        let imagePicker = UIImagePickerController()
        imagePicker.delegate = self
        imagePicker.allowsEditing = true
        imagePicker.sourceType = sourceType
        present(imagePicker, animated: true, completion: nil)
    }
    
    // MARK: - UIImagePickerControllerDelegate
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]){
        
        if let imagePicked = info[UIImagePickerControllerEditedImage] as? UIImage {
            
            self.btnProfilePicture.setImage(imagePicked, for: .normal)
        }
        dismiss(animated: true, completion: nil)
        
    }
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
    
}

